<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReceiptRequest;
use App\Models\Payment;
use App\Models\Receipt;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getUserAllPayments(Request $request)
    {
        //
        $status = 200;
        $error = "";
        try {
            $keyword = $request->keyword;
            $year = $request->year;
            $month = $request->month;
            $min_price = $request->minPrice;
            $max_price = $request->maxPrice;
            $start_date = $request->startDate;
            $end_date = $request->endDate;
            $max_page_count = Auth::user()->max_page_count;

            $query = Auth::user()->payments()
                ->with(['receipt' => function ($q) {
                    $q->where('delete_flg', 0);
                }])
                ->where('delete_flg', 0)
                ->when($keyword, function ($query, $keyword) {
                    return $query->where('title', 'LIKE', "%{$keyword}%");
                })
                ->when($min_price, function ($query, $min_price) {
                    return $query->where('price', '>=', $min_price);
                })
                ->when($max_price, function ($query, $max_price) {
                    return $query->where('price', '<=', $max_price);
                })
                ->when($year && !$start_date && !$end_date, function ($query) use ($year) {
                    return $query->whereYear('payment_date', $year);
                })
                ->when($month && !$start_date && !$end_date, function ($query) use ($month) {
                    return $query->whereMonth('payment_date', $month);
                })
                ->when($start_date, function ($query, $start_date) {
                    return $query->where('payment_date', '>=', $start_date);
                })
                ->when($end_date, function ($query, $end_date) {
                    return $query->where('payment_date', '<=', $end_date);
                })
                ->orderBy('payment_date', 'desc');

            $payment_total_price = (clone $query)->sum('price');
            $payment_paginate = $query->paginate($max_page_count);

        } catch (Exception $e) {
            $error = $e->getMessage();
            $status = 500;
        }

        return response()->json([
            'paymentPaginate' => $payment_paginate,
            'paymentTotalPrice' => $payment_total_price,
            'status' => $status,
            'error' => $error
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $status = 200;
        $error = "";
        try {
            $user_id = Auth::id();
            Payment::create([
                'user_id' => $user_id,
                'title' => $request->input('title'),
                'price' => $request->input('price'),
                'payment_date' => $request->input('payment_date'),
                'delete_flg' => 0
            ]);
        } catch (Exception $e) {
            $status = 500;
            $error = $e->getMessage();
        }

        return response()->json([
            'status' => $status,
            'error' => $error
        ]);
    }

    /**
     * レシート読み取り登録
     */
    public function storeReceiptData(ReceiptRequest $request)
    {
        try {
            if (!$request->validated()) {
                Log::error('[ERROR] /storeReceiptData', ['error' => 'Request値に誤りがあります']);
                return response()->json([
                    'error' => 'Request値に誤りがあります'
                ], Response::HTTP_BAD_REQUEST);
            }

            DB::beginTransaction();
            $user_id = Auth::id();
            $payment = Payment::create([
                'user_id' => $user_id,
                'title' => $request->input('shopName'),
                'price' => $request->input('totalAmount'),
                'payment_date' => $request->input('date'),
                'delete_flg' => 0,
            ]);
            Receipt::create([
                'payment_id' => $payment->id,
                'items' => json_encode($request->input('items')),
                'delete_flg' => 0,
            ]);
            DB::commit();

            return response()->json([], Response::HTTP_OK);

        } catch (Exception $e) {
            DB::rollBack();
            Log::error('[ERROR] /storeReceiptData', ['error' => $e->getMessage()]);
            return response()->json([
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        //
        $status = 200;
        $error = "";
        try {
            $payment = Payment::findOrFail($id);
            $payment->update([
                'title' => $request->input('title'),
                'price' => $request->input('price'),
                'payment_date' => $request->input('payment_date'),
            ]);

        } catch (Exception $e) {
            $status = 500;
            $error = $e->getMessage();
        }

        return response()->json([
            'status' => $status,
            'error' => $error
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        //
        $status = 200;
        $error = "";
        $id_list = $request->input('idList');
        try {
            if (is_array($id_list) && !empty($id_list)) {
                foreach ($id_list as $id) {
                    $payment = Payment::findOrFail($id);
                    $receipt = $payment->receipt()->first();
                    if ($receipt != null) {
                        $receipt->update(['delete_flg' => 1]);
                    }
                    $payment->update([
                        'delete_flg' => 1
                    ]);
                }
            } else {
                $status = 400;
            }

        } catch (Exception $e) {
            $status = 500;
            $error = $e->getMessage();
        }

        return response()->json([
            'status' => $status,
            'error' => $error
        ]);
    }

    public function joinTags(int $id, Request $request)
    {
        $status = 200;
        $error = '';
        try {
            $tag_ids = $request->input('tagIds');
            $payment = Payment::findOrFail($id);
            $payment->tags()->sync($tag_ids);

        } catch (Exception $e) {
            $status = 500;
            $error = $e->getMessage();
        }

        return response()->json([
            'status' => $status,
            'error' => $error
        ]);
    }
}

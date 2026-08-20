<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
            $tag_id = $request->tagNo;
            $start_date = $request->startDate;
            $end_date = $request->endDate;

            $query = Auth::user()->payments()
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
            $payment_paginate = $query->paginate(10);

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

<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\Payment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Exception;

class TagController extends Controller
{

    public function getAll()
    {
        $status = 200;
        $error = '';
        $all_tags = [];
        try {
            $all_tags = Auth::user()->tags()->where('delete_flg', 0)->orderBy('created_at', 'desc')->get();

        } catch (Exception $e) {
            $status = 500;
            $error = $e->getMessage();
        }

        return response()->json([
            'status' => $status,
            'error' => $error,
            'allTags' => $all_tags
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function getMonthlyTags(Request $request)
    {
        //
        $status = 200;
        $error = '';
        $monthly_tags = [];
        try {
            // 指定年月の支払いデータ取得
            $year = $request->year;
            $month = $request->month;

            $user_payments = Auth::user()->payments()
                ->where('delete_flg', 0)
                ->when($year, function ($query, $year) {
                    return $query->whereYear('payment_date', $year);
                })
                ->when($month, function ($query, $month) {
                    return $query->whereMonth('payment_date', $month);
                })
                ->get();
            $monthly_total_price = (clone $user_payments)->sum('price');

            $user_tags = Auth::user()->tags()->where('delete_flg', 0)->get();
            if (count($user_tags) !== 0) {
                foreach ($user_tags as $tag) {
                    $tag_payments = $tag->payments()
                        ->where('delete_flg', 0)
                        ->when($year, function ($query, $year) {
                            return $query->whereYear('payment_date', $year);
                        })
                        ->when($month, function ($query, $month) {
                            return $query->whereMonth('payment_date', $month);
                        })->get();

                    if (count($tag_payments) !== 0) {
                        $monthly_tags[] = [
                            'id' => $tag->id,
                            'name' => $tag->name,
                            'tag_color' => $tag->color,
                            'count' => count($tag_payments),
                            'total_price' => $tag_payments->sum('price'),
                            'monthly_total_price' => $monthly_total_price
                        ];
                    }
                }
            }

        } catch (Exception $e) {
            $status = 500;
            $error = $e->getMessage();
        }

        return response()->json([
            'status' => $status,
            'error' => $error,
            'monthlyTags' => $monthly_tags
        ]);
    }

    public function getMonthlyPaymentTagList(Request $request) {
        $status = 200;
        $error = '';
        $payment_tags = [];
        try {
            $year = $request->year;
            $month = $request->month;
            $payments = Auth::user()->payments()
                ->where('delete_flg', 0)
                ->when($year, function($query, $year) {
                    return $query->whereYear('payment_date', $year);
                })
                ->when($month, function($query, $month) {
                    return $query->whereMonth('payment_date', $month);
                })
                ->get();

            foreach ($payments as $payment) {
                $tags = $payment->tags()->where('delete_flg', 0)->get();
                if (count($tags) != 0) {
                    $tag_id_list = [];
                    foreach ($tags as $tag) $tag_id_list[] = $tag->id;
                    $payment_tags[] = [
                        'payment_id' => $payment->id,
                        'tag_id_list' => $tag_id_list
                    ];
                }
            }

        } catch (Exception $e) {
            $status = 500;
            $error = $e->getMessage();
        }

        return response()->json([
            'status' => $status,
            'error' => $error,
            'paymentTags' => $payment_tags
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $status = 200;
        $error = '';
        try {
            $exist_tag_name = Auth::user()
                ->tags()
                ->where('name', $request->input('name'))
                ->where('delete_flg', 0)
                ->first();
            if ($exist_tag_name !== NULL) {
                $status = 400;
            } else {
                $my_tags_count = Auth::user()->tags()->where('delete_flg', 0)->count();
                if ($my_tags_count < 10) {
                    Tag::create([
                        'user_id' => Auth::id(),
                        'name' => $request->input('name'),
                        'color' => $request->input('color'),
                        'delete_flg' => 0
                    ]);
                } else {
                    $status = 400;
                    $error = 'タグは10個まで追加可能です';
                }
            }

        } catch (Exception $e) {
            $status = 500;
            $error = $e->getMessage();
        }

        return response()->json([
            'status' => $status,
            'error' => $error,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        //
        $status = 200;
        $error = '';
        try {
            $tag = Tag::findOrFail($id);
            $tag->update([
                'user_id' => Auth::id(),
                'name' => $request->input('name'),
                'color' => $request->input('color')
            ]);

        } catch (Exception $e) {
            $status = 500;
            $error = $e->getMessage();
        }

        return response()->json([
            'status' => $status,
            'error' => $error,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
        $status = 200;
        $error = '';
        try {
            $tag = Tag::findOrFail($id);
            $tag->update([
                'delete_flg' => 1
            ]);

        } catch (Exception $e) {
            $status = 500;
            $error = $e->getMessage();
        }

        return response()->json([
            'status' => $status,
            'error' => $error,
        ]);
    }

}

<?php

namespace App\Models;

use App\Observers\PaymentObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;

#[ObservedBy([PaymentObserver::class])]
class Payment extends Model
{
    use HasFactory;

    public const CASH = 'cash';
    public const CASHLESS = 'cashless';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'invoice_id',
        'number',
        'amount',
        'date',
        'method',
        'note',
        'paid'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }

    public static function getNewNumber($date = null)
    {
        // PAY-202401-001
        if (!$date) $date = date('Y-m-d');
        $dateString = explode('-', $date);
        $dateString = $dateString[0] . (isset($dateString[1])?$dateString[1]:'');
        $format = 'PAY-'.$dateString.'-';
        $payment = self::select('number')->where('number', 'LIKE', $format.'%')->orderBy('number', 'desc')->first();

        $currentNumber = 0;
        if ($payment) {
            $number = explode('-', $payment->number);
            if (isset($number[2])) {
                $currentNumber = intval($number[2]);
            }
        }
        return $format . str_pad(++$currentNumber, 4, '0', STR_PAD_LEFT);
    }
}

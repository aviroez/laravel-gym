<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Invoice extends Model
{
    use HasFactory;

    public const UNPAID = 'unpaid';
    public const PARTIALLY_PAID = 'partially_paid';
    public const PAID = 'paid';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'parent_id',
        'number',
        'date',
        'total',
        'status',
        'due_date',
        'note'
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function parent(): BelongsTo {
        return $this->belongsTo(Invoice::class);
    }

    public function items(): HasMany {
        return $this->hasMany(InvoiceItem::class);
    }

    public static function getNewNumber($number = null, $date = null)
    {
        // INV-202401-001
        if (!$date) $date = date('Y-m-d');
        $dateString = explode('-', $date);
        $dateString = $dateString[0] . (isset($dateString[1])?$dateString[1]:'');
        $format = $number ? $number : 'INV-'.$dateString.'-';
        $invoice = Invoice::select('number')->where('number', 'LIKE', $format.'%')->orderBy('number', 'desc')->first();

        $currentNumber = 0;
        if ($invoice) {
            $number = explode('-', $invoice->number);
            if (isset($number[2])) {
                $currentNumber = intval($number[2]);
            }
        }

        return $format . str_pad(++$currentNumber, 4, '0', STR_PAD_LEFT);
    }
}

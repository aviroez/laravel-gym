<?php

if (!function_exists('formatDate')) {
    function formatDate($date, $format = 'Y-m-d') {
        return \Carbon\Carbon::parse($date)->format($format);
    }
}

if (!function_exists('currencyNumber')) {
    function currencyNumber($number) {
        return \Illuminate\Support\Number::format($number ?? 0, 0, 0, 'id');
    }
}

if (!function_exists('removeAfterLastDash')) {
    function removeAfterLastDash($string) {
        // find last position of dash (-)
        $lastDashPosition = strrpos($string, '-');

        // split with added +1 char
        if ($lastDashPosition !== false) {
            return substr($string, 0, $lastDashPosition + 1); // +1 untuk menyertakan dash terakhir
        }

        return $string;
    }
}
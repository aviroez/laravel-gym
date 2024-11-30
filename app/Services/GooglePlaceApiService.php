<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GooglePlaceApiService
{
    protected $results = [];
    protected $placeId;
    protected $apiKey;
    protected $baseUrl = "https://maps.googleapis.com/maps/api/place/details/json";

    public function __construct(string $placeId, string $apiKey = null)
    {
        $this->placeId = $placeId;
        $this->apiKey = $apiKey ?: config('google.api_key');
    }

    /**
     * Display the user's profile form.
     */
    public function fetchData()
    {
        $response = Http::get($this->baseUrl, [
            'placeid' => $this->placeId,
            'key' => $this->apiKey,
        ]);
        
        if ($response->successful()) {
            return $response->json();
        } else {
            return $response->body();
        }
    }

    /**
     * Initializes the results by fetching data if not already done.
     */
    public function initializeResults() {
        if (!$this->results) {
            $this->results = $this->fetchData()['result'] ?? [];
        }
    }

    /**
     * Retrieves reviews from the Google Places API response.
     *
     * @return array
     */
    public function getReviews() {
        $this->initializeResults();
        return $this->results['reviews'] ?? [];
    }

    /**
     * Retrieves address components from the Google Places API response.
     *
     * @return array
     */
    public function getAddressComponents() {
        $this->initializeResults();
        return $this->results['address_components'] ?? [];
    }
}

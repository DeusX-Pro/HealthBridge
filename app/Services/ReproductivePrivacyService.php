<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Crypt;

class ReproductivePrivacyService
{
    /**
     * Seal sensitive payload (symptoms, intimacy, notes).
     */
    public function encryptSensitiveData(User $user, array|string $data): string
    {
        $json = is_array($data) ? json_encode($data) : $data;
        return Crypt::encryptString($json);
    }

    /**
     * Unseal sensitive payload.
     */
    public function decryptSensitiveData(string $ciphertext): mixed
    {
        try {
            $decrypted = Crypt::decryptString($ciphertext);
            $decoded = json_decode($decrypted, true);
            return $decoded !== null ? $decoded : $decrypted;
        } catch (\Exception $e) {
            return null;
        }
    }
}


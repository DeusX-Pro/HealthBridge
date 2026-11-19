<?php

namespace App\Services;

class MfaService
{
    private static string $base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

    public function generateSecret(int $length = 16): string
    {
        $secret = '';
        $bytes = random_bytes($length);
        for ($i = 0; $i < $length; $i++) {
            $secret .= self::$base32Chars[ord($bytes[$i]) % 32];
        }
        return $secret;
    }

    public function verifyCode(string $secret, string $code, int $discrepancy = 1): bool
    {
        $currentTimeSlice = floor(time() / 30);
        for ($i = -$discrepancy; $i <= $discrepancy; $i++) {
            $calculatedCode = $this->calculateCode($secret, (int) ($currentTimeSlice + $i));
            if (hash_equals($calculatedCode, trim($code))) {
                return true;
            }
        }
        return false;
    }

    public function getOtpAuthUrl(string $email, string $secret, string $issuer = 'HealthBridge'): string
    {
        return 'otpauth://totp/' . rawurlencode($issuer . ':' . $email) . '?secret=' . $secret . '&issuer=' . rawurlencode($issuer) . '&algorithm=SHA1&digits=6&period=30';
    }

    private function calculateCode(string $secret, int $timeSlice): string
    {
        $secretKey = $this->base32Decode($secret);
        $time = chr(0) . chr(0) . chr(0) . chr(0) . pack('N*', $timeSlice);
        $hmac = hash_hmac('sha1', $time, $secretKey, true);
        $offset = ord(substr($hmac, -1)) & 0x0F;
        $hashPart = substr($hmac, $offset, 4);
        $value = unpack('N', $hashPart)[1] & 0x7FFFFFFF;
        $modulo = pow(10, 6);
        return str_pad((string) ($value % $modulo), 6, '0', STR_PAD_LEFT);
    }

    private function base32Decode(string $b32): string
    {
        $b32 = strtoupper($b32);
        $binary = '';
        foreach (str_split($b32) as $char) {
            $pos = strpos(self::$base32Chars, $char);
            if ($pos === false) continue;
            $binary .= str_pad(decbin($pos), 5, '0', STR_PAD_LEFT);
        }
        $bytes = '';
        $chunks = str_split($binary, 8);
        foreach ($chunks as $chunk) {
            if (strlen($chunk) === 8) {
                $bytes .= chr(bindec($chunk));
            }
        }
        return $bytes;
    }
}


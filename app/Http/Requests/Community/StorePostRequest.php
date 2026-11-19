<?php

namespace App\Http\Requests\Community;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'channel_id' => ['required', 'exists:community_channels,id'],
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string', 'min:5', 'max:10000'],
        ];
    }
}

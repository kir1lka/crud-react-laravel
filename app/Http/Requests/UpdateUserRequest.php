<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        //Rule::unique('users', 'email')->ignore($this->user->id)
        // 'email' => ['required', 'email', 'unique:users,email'],

        return [
            'name' => ['required', 'string', 'max:55', 'min:5'],
            'email' => ['required', 'email', Rule::unique('users', 'email')->ignore($this->user->id)],
            'password' => ['required', 'confirmed', Password::min(8)->letters()->symbols()],
        ];
    }
}

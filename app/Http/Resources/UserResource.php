<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;


// class UserResource extends ResourceCollection
// use Illuminate\Http\Resources\Json\ResourceCollection;

class UserResource extends JsonResource
{

    public static $wrap = false;
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
        // return $this->collection->map(function ($user) {
        //     return [
        //         'id' => $user->id,
        //         'name' => $user->name,
        //         'email' => $user->email,
        //         'created_at' => $user->created_at->format('Y-m-d H:i:s'),
        //     ];
        // });
    }
}

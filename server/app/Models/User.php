<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'email' => $this->email,
            'name' => $this->name,
            'image' => $this->image,
            'id' => $this->id,
            'role' => $this->role,
            'books' => $this->books->map(function($e) {
                return $e->bid;
            }),
            'reviews' => $this->reviews->map(function($e) {
                return $e->id;
            })
        ];
    }

    protected $fillable = [
        'name',
        'email',
        'image',
        'password',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function reviews()
    {
        return $this->hasMany(Review::class, 'user_id', 'id');
    }

    public function books()
    {
        return $this->belongsToMany(Book::class, 'book_user', 'user_id', 'book_id');
    }
}

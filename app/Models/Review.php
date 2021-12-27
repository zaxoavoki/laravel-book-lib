<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class Review extends Model
{
    protected $connection = 'mongodb';
    protected $fillable = ['text', 'stars', 'book', 'user'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}

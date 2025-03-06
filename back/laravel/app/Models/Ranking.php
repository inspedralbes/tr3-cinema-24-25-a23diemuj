<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Ranking extends Model
{
    use HasFactory;

    protected $table = 'rankings';

    protected $fillable = [
        'username',
        'puntuacion',
    ];

   
}

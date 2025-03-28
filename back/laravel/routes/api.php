<?php

use App\Http\Controllers\PartidaController;
use App\Http\Controllers\RankingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

 
 


Route::get('/preguntas/nivel/{nivel}', [PartidaController::class, 'obtenerPreguntasPorNivel']);
Route::post('/ranking', [RankingController::class, 'store']);
Route::get('/rankings/{username}', [RankingController::class, 'getRankings']);
Route::get('/ranking/{deporte}', [RankingController::class, 'getRanking']);
 
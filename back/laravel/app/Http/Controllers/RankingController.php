<?php

namespace App\Http\Controllers;

use App\Models\Ranking;
use Illuminate\Http\Request;

class RankingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required',
            'puntuacion' => 'required',
            'deporte'=> 'deporte'
        ]);

        $ranking = new Ranking();
        $ranking->username = $validated['username'];
        $ranking->puntuacion = $validated['puntuacion'];
        $ranking->deporte = $validated['deporte'];
        $ranking->save();

        return response()->json(['message' => 'Puntuación guardada con éxito'], 201);
    }

    public function getRanking()
{
    $rankings = Ranking::orderBy('puntuacion', 'desc')  
        ->take(5)
        ->get();

    $result = $rankings->map(function ($ranking) {
        return [
            'id' => $ranking->id,
            'username' => $ranking->username, // Ahora obtenemos directamente el 'username' de la tabla ranking
            'puntuacion' => $ranking->puntuacion,
            'created_at' => $ranking->created_at,
        ];
    });

    return response()->json($result);
}
}

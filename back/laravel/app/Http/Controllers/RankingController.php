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
            'deporte'=> 'required'
        ]);

        $ranking = new Ranking();
        $ranking->username = $validated['username'];
        $ranking->puntuacion = $validated['puntuacion'];
        $ranking->deporte = $validated['deporte'];
        $ranking->save();

        return response()->json(['message' => 'Puntuación guardada con éxito'], 201);
    }

    public function getRanking($deporte)
{
    $rankings = Ranking::where('deporte', $deporte)
        -> orderBy('puntuacion', 'desc')  
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

public function getRankings($username)
{
    $rankings = Ranking::where('username', $username)
        -> orderBy('puntuacion', 'desc')  
        ->take(1)
        ->get();

    $result = $rankings->map(function ($ranking) {
        return [
            'id' => $ranking->id,
            'username' => $ranking->username, // Ahora obtenemos directamente el 'username' de la tabla ranking
            'puntuacion' => $ranking->puntuacion,
            'deporte' => $ranking->deporte,
            'created_at' => $ranking->created_at,
        ];
    });

    return response()->json($result);
}

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $table = "productos";
    protected $fillable = ['name', 'tipo','precio_tapa', 'precio_media', 'precio_racion', 'precio_bebida', 'IVA', 'Cocina', 'Activado', 'Imagen'];
}

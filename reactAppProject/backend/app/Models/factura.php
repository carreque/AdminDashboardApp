<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class factura extends Model
{
    protected $table = "facturas";
    protected $fillable = ['Referencia', 'id_mesa', 'consumiciones', 'tipos', 'total_base', 'total_iva', 'total'];
}

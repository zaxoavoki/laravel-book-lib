<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookRequest;
use Validator;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function __constructor() {
        //
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Book::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBookRequest $request)
    {
        $validated = $request->validated();

        // if ($validator->fails()) {
        //     return response()->json($validator->errors());
        // }

        $book = Book::create([
            'title' => $request->title,
            'authors' => $request->authors,
            'description' => $request->description,
            'image' => $request->image,
            'reviews' => []
        ]);
        return response()->json($book);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function show(Book $book)
    {
        return response()->json($book || null);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Book $book)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function destroy(Book $book)
    {
        $book->delete();
        return response()->json(['success' => true]);
    }
}

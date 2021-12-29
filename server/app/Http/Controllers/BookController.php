<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Http\Resources\BookResource;
use App\Models\Book;
use App\Models\BookUser;
use Illuminate\Support\Facades\Log;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return BookResource::collection(Book::paginate());
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
        $book = Book::firstWhere('bid', $validated['bid']);
        if (!$book) {
            $book = Book::create($validated);
        }

        $bookUser = BookUser::where([
            ['user_id', '=', auth('api')->user()->id],
            ['book_id', '=', $book->id],
        ])->first();
        if ($bookUser) {
            return ['error' => 'You have already saved this book'];
        }

        BookUser::create([
            'user_id' => auth('api')->user()->id,
            'book_id' => $book->id
        ]);
        return new BookResource($book);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function show(Book $book)
    {
        return new BookResource($book);
    }

    /**
     * Display the specified resource with where clause.
     *
     * @param  string   $bid
     * @return \Illuminate\Http\Response
     */
    public function showByBID($bid)
    {
        $book = Book::with('reviews')->firstWhere('bid', $bid);
        if (!$book) {
            return ['error' => 'Book does not exist'];
        }
        return new BookResource($book);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBookRequest $request, Book $book)
    {
        $validated = $request->validated();
        foreach ($validated as $k => $v) {
            $book->$k = $v;
        }
        $book->save();
        return new BookResource($book);
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
        return new BookResource($book);
    }
}

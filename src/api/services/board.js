export async function getAllBoards() {

    // Returns an array that looks like this:
    // const paths = [
    //     {
    //         params: {
    //             board: 'a'
    //         }
    //     },
    //     {
    //         params: {
    //             board: 'v'
    //         }
    //     }
    // ]

    const res = await fetch('http://localhost:3001/boards');
    const boards = await res.json();
    return boards.map(board => {
        return {
            params: {
                board: board.board
            }
        }
    })


}
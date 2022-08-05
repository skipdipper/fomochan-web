import { useRef, useState } from "react"

// hack pass parent state as prop
export default function SearchForm({ data, setData }) {
    const form = useRef(null);
    const searchInput = useRef(null);

    const [isLoading, setLoading] = useState(false);
    const [autoSuggestions, setAutoSuggestions] = useState([]);

    function searchThreads(query) {
        console.log('searching...')
        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/a/threads/${query}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(form.current);
        const { search } = form.current;
        console.log(`searched for: ${search.value}`);
        searchThreads(search.value);
    }


    function handleOnChange(query) {
        let matches = [];

        console.log('search input', query);

        if (query.length) {
            matches = data.filter(thread => {
                return thread.subject.toLowerCase().includes(query);
            })
        }
        console.log('matches', matches);
        setAutoSuggestions(matches);
    }

    function handleOnSuggest(autoSuggestion) {
        console.log('clicked search suggestion')
        searchInput.current.value = autoSuggestion.subject;
        setAutoSuggestions([]);
    }



    return (
        <>
            <form ref={form} onSubmit={handleSubmit} id="search-form">
                <input
                    type="text"
                    name="search"
                    placeholder="Search OPs"

                    onChange={e => handleOnChange(e.target.value)}
                    ref={searchInput}
                />
                <button type="submit">Search</button>
            </form>

            {autoSuggestions &&
                <div className="search-suggestion-container">
                    {autoSuggestions.map((autoSuggestion, i) => {
                        return <div className="search-suggestion" key={`s${i}`}
                            onClick={() => handleOnSuggest(autoSuggestion)}
                        >
                            {autoSuggestion.subject}
                        </div>
                    })}
                </div>
            }
        </>

    )

}

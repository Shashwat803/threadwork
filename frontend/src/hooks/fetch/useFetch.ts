import { useQuery } from "@tanstack/react-query"
import { fetchAllPosts } from "../../api/APIEndpoints"


const useFetch = () => {
    const { data, isPending, isError, error } = useQuery({ queryKey: ['posts'], queryFn: fetchAllPosts })
    return {
        data,
        isPending,
        isError,
        error
    }
}

export default useFetch
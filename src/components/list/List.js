import React from "react";
import {handleResponse} from "../../helpers";
import {API_URL} from "../../config";
import Loading from "../common/Loading";
import Table from "./Table";
import Pagination from "./Pagination";



class List extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            currencies: [],
            error: null,
            totalPages: 0,
            page: 1,
        };
        // this.handlePaginationClick = this.handlePaginationClick.bind(this);
    }

    
    componentDidMount(){
        this.fetchCarrencies();       
    }

    // componentDidUpdate( _ ,prevState){
    //     if(prevState.page !== this.state.page){
    //         this.fetchCarrencies();       
    //     };
    // }

    fetchCarrencies(){
        this.setState({
            loading:true,
        });
        const {page}=this.state;
        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
            .then(handleResponse)
            .then((data) => {
                const {currencies, totalPages} = data;
                this.setState({
                    currencies,
                    totalPages,
                    loading: false,
                });
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    error: error.errorMessage,        
                });    
            });
    }

      
    handlePaginationClick = (direction) => {
        const{page} = this.state;
        const nextPage = direction === "next" ? (page+1) : (page-1);
        this.setState({ page: nextPage},
             () => this.fetchCarrencies());
    }

    render() {
        const {loading, error, currencies, page, totalPages} = this.state;
        if(loading){
            return (
                <div className="loading-container">
                    <Loading />
                </div>
            );
        }

        if(error) {
        return <div className="error">{error}</div>
        }

        return(
            <div>
                <Table
                currencies={currencies}
                />
                <Pagination 
                    page={page}
                    totalPages={totalPages}
                    handlePaginationClick={this.handlePaginationClick}
                />
            </div>
        );
    }
}

export default List;
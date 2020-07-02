import React from "react";
import {withRouter} from "react-router-dom";
import Loading from "./Loading";
import {API_URL} from "../../config";
import {handleResponse} from "../../helpers";
import "./Search.css";

class Search extends React.Component {
    state = {
        searchQuery: "",
        searchResults: [],
        loading: false,
    }

    handleChange = async (event) => {
        const {value} = event.target;
        this.setState({
            searchQuery: value,
        });

        if(!value){
            return
        };

        this.setState({
            loading: true,
        });

        const result = await fetch(`${API_URL}/autocomplete?searchQuery=${value}`);
        const searchResults = await handleResponse(result);
        this.setState({
            loading: false,
            searchResults,
        });
    }

    handleRedirect = (currencyId) => {
        this.setState({
            searchQuery: "",
            searchResults: [],
        });
        this.props.history.push(`/currency/${currencyId}`);
    }

    renderSearchResult(){
        const {searchResults, searchQuery, loading} = this.state;
        if( !searchQuery){
            return;
        };
        return searchResults.length ? (
            <div className="Search-result-container">
                {
                    searchResults.map(result => 
                        <div 
                            key={result.id} 
                            className="Search-result" 
                            onClick= {()=>this.handleRedirect(result.id)}>
                                {result.name} ({result.symbol})
                        </div>)
                }
            </div>
        ) :  !loading ? (
            <div className="Search-result-container">
                <div className="Search-no-result">
                    No Results Found
                </div>
            </div>
        ) : null 
    }

    render(){
        const {loading, searchQuery} = this.state;
        return (
            <div className="Search">
                <span className="Search-icon"/>
                <input 
                    className="Search-input" 
                    type="text" 
                    value={searchQuery}
                    placeholder="currencie name"
                    onChange={this.handleChange}
                />
                {
                loading &&
                <div className="Search-loading">
                    <Loading width="12px" height="12px"/>
                </div>
                }
                {this.renderSearchResult()}
            </div>
        );
    }
}

export default withRouter(Search);
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {debounce} from 'throttle-debounce';

import { userActions } from '../_actions';
import {PlanetChart} from '../Chart';



class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.searchResult = this.searchResult.bind(this);
        this.searchData = this.searchData.bind(this);
        this.chartResult = this.chartResult.bind(this);                        
        this.callAjax = debounce(4000, this.callAjax);
        this.chartData = {};
    }
    handleChange(event) {
        this.callAjax(event.target.value);
    }
    callAjax(value) {
     this.props.dispatch(userActions.search(value));
       
    }
    searchData() {
        if (typeof this.props.users.search != 'undefined' ) {
            if (this.props.users.search.length < 1) {
                this.chartData = {};
                return (<tr><td colSpan="5">No result found</td></tr>);
            }
            this.chartData = {
                options: {
                    title: 'Planets Name vs. Diameter comparison',
                    hAxis: { title: 'Diameter', minValue: 0, maxValue: 15 },
                    vAxis: { title: 'Planet Name', minValue: 0, maxValue: 15 },
                    legend: 'none',
                  },
                  data : [['Name', 'Diameter']] 
            } ;
            return this.props.users.search.map((value) => {
                this.chartData.data.push([value.name, +value.diameter]) ;
                return (<tr key={value.name}>
                    <td>{value.name}</td>
                    <td>{value.climate}</td>
                    <td>{value.diameter}</td>
                    <td>{value.gravity}</td>                    
                    <td>{value.population}</td>
                </tr>);
            }); 
        }
    }
    chartResult() {
        if (typeof this.props.users.search != 'undefined' ) {
            return <PlanetChart chartData={this.chartData}/>
        } else {
            return ;
        }
    }
    searchResult() {
        if (typeof this.props.users.search != 'undefined' ) {
            return <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="panel panel-success">
                                    <table className="table table-hover" id="task-table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Climate</th>
                                                <th>Diameter</th>
                                                <th>Gravity</th>
                                                <th>Population</th>                                        
                                            </tr>
                                        </thead>
                                        <tbody>

                                        {this.searchData()}
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>;
        } else {
            return ;
        }     
    }
    
    render() {
        const { user, users } = this.props;

        return (
            <div className="col-md-9 col-md-offset-3">
                <h2>Hi {user.name}!</h2> <Link to="/login">Logout</Link>
                    <div className='form-group'>
                        <label htmlFor="search">Search</label>
                        <input type="text" className="form-control" name="search" onKeyUp={this.handleChange} />
                    </div>

                    {this.searchResult()}
                    {this.chartResult()}
               
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
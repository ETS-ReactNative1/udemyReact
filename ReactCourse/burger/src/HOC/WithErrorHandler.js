import React, { Component } from 'react'
import Modal from '../components/UI/Modal/Modal'
import AuxiliaryContainer from './AuxiliaryContainter'


const withErrorHandler = (Wrapped, axios) => {
	return class extends Component {

        state = {
            error: null
        }

        componentDidMount() {
            axios.interceptors.response.use(null, error=> {
                this.setState({error: error})
            })
        }

        render () { 
            return (
                <AuxiliaryContainer >
                    <Modal >Something went wrong...</Modal>
                    <Wrapped {...this.props}/>
                </AuxiliaryContainer>
            )
        }
    }
}

export default withErrorHandler
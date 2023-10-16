import React from 'react'
import Account from './Account'
import Notify from './Notify'
import Privacy from './Privacy'
import Perform from './Perform'
import Advanced from './Advanced'

function Pages({page}) {
    if(page == 'account') return (<Account />)
    else if(page == 'notify') return (<Notify />)
    else if(page == 'privacy') return (<Privacy />)
    else if(page == 'perform') return (<Perform />)
    else if(page == 'advanced') return (<Advanced />)
    return(

        <p>Others</p>
    )
        
}

export default Pages
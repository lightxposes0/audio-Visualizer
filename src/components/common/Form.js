import * as React from 'react';
import Button from './Button';


export default function BasicTextFields({title, setPassword, setEmail, handleAction}) {
    return (
        <div className='form_container'>
            <div className='form_wrapper'>
                <div className="form-heading">
                        <h3>
                            {title} Here
                        </h3>
                </div>


                <div className='formBox'>
                    <form>
                        <input placeholder='Email..' className='input_text' onChange={(e) => setEmail(e.target.value)} id = "email" label="Enter your Email"></input>
                        <input placeholder='Password..' className='input_text' type="password" onChange={(e) => setPassword(e.target.value)} id = "password" label="Enter your Password"></input>
                    </form>
                </div>
                

                <Button handleAction={handleAction} title={title}/>
            </div>
        </div>
    );
}
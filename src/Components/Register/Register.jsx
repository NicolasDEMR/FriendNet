import "./Register.css";
import Menu from "../../Layouts/Menu/Menu";
import Footer from "../../Layouts/Footer/Footer";

function Register() {
  return (
    <div>
      <div className='menuWrapper'>
        <Menu />
      </div>
      <div className='d-flex justify-content-center mt-5'>
        <form className='d-flex flex-column w-50 justify-content-center'>
          <div className='mb-2 d-flex gap-1'>
            <input
              type='text'
              className='form-control'
              id='exampleInputName2'
              aria-describedby='First Name'
              placeholder='First Name'
            />
            <input
              type='text'
              className='form-control'
              id='exampleInputName1'
              aria-describedby='Name'
              placeholder='Name'
            />
          </div>
          <div className='mb-3'>
            <input
              type='email'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='Email'
            />
            <div id='emailHelp' className='form-text'>
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className='mb-3'>
            <input
              type='password'
              className='form-control'
              id='exampleInputPassword1'
              placeholder='Password'
            />
          </div>
          <div className='mb-3'></div>
          <button type='submit' className='btn btn-primary'>
            Register
          </button>
        </form>
      </div>
      <div className='footerWrapper'>
        <Footer />
      </div>
    </div>
  );
}

export default Register;

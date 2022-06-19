import Logo from '../img/logo.png';
import Abstraction from '../img/abstraction.png';


const LeftSide = () => {
  return (
    <div className="left">
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <p className="left-title">Getting Started With VR Creation</p>
      <div className="abstraction">
        <img className="abs-img" src={Abstraction} alt="abs" />
      </div>
    </div>
  )
}

export default LeftSide
import { Link } from "react-router-dom";
import { LinkedinFilled, GithubFilled } from "@ant-design/icons";
import reactLogo from '../../assets/React-icon.png';
import nodeLogo from '../../assets/nodejs_logo.png';

import "./footer.css";

export function Footer(){
    return(
        <footer className="footer">
                <div className="description">
                    <img src={reactLogo} alt="React JS" className="reactlogo"/>
                    <img src={nodeLogo} alt="Node JS" className="nodelogo"/>
                </div>
                
                <h3><strong>Patrick Rodrigues de Carvalho </strong><br/> React / Node JS - Software Developer, 2020 - present</h3>

                <div className="social_media">
                    <Link to="https://github.com/Patrick-Dev-01?tab=repositories" target="_blank">
                        <GithubFilled />
                        <span>Github</span>
                    </Link>
                    <Link to="https://www.linkedin.com/in/patrick-rodrigues-7a4a19180/" target="_blank">
                       <LinkedinFilled />
                       <span>Linkedin</span>
                    </Link>
                </div>
        </footer>
    )
}
import React from "react";
import {connect} from "react-redux";
import "../static/css/home.less";
import {Link} from "react-router-dom";
import HomeTop from "./home/HomeTop";
import HotCategory from "./home/HotCategory";
import HotBrand from "./home/HotBrand";
import HotSingle from "./home/HotSingle";
import action from "../store/action";
import MaybeLike from "./home/MaybeLike";
import HomeFooter from "./home/HomeFooter";
import {Icon} from "antd";
import {isLogin} from "../api/person";
import BottomNav from "../component/BottomNav";

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            left: "left",
            right: "right on",
            mark: "mark",
            isLogin: false
        };
    }

    async componentWillMount() {
        if (this.state.isLogin) return;
        let result = await isLogin();
        if (parseFloat(result.code) === 0) {
            this.setState({
                isLogin: true
            });
        }
    }

    async componentDidMount() {
        if (this.props.homeData.n < 8) {
            this.props.queryData();
        }
    }


    render() {
        let {isLogin,left, right, mark} = this.state,
            {homeData} = this.props;
        if (homeData.n < 8) return "";

        return <section className="homeBox">
            <div className={right} ref="right">
                <div className="homeLogoBox">
                    <Icon type="menu-unfold" onClick={this.leftOn}/>
                    <span className="logo">Yoho!Buy</span>
                    <a href="#"><Icon type="search"/></a>
                </div>
                <HomeTop homeData={homeData}/>
                <HotCategory homeData={homeData}/>
                <HotBrand homeData={homeData}/>
                <HotSingle homeData={homeData}/>
                <MaybeLike homeData={homeData}/>
                {isLogin ? "" : <HomeFooter/>}
                <div className={mark} onClick={this.rightOff} ref="mask"></div>
            </div>
            <div className={left}>
                <ul className="first">
                    <li>
                        <Link to="/classify/man">
                            <span className="nav-img"></span>
                            <em>男生</em>
                            <span className="title">GIRLS</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/classify/women">
                            <span className="nav-img" style={{
                                backgroundImage: "url('//img11.static.yhbimg.com/yhb-img01/2015/09/28/10/01399a2fd752e0d334f57be11d4dbf41c5.png')"
                            }}></span>
                            <em>女生</em>
                            <span className="title">boys</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/classify/kids">
                            <span className="nav-img" style={{
                                backgroundImage: "url('//img11.static.yhbimg.com/yhb-img01/2015/10/19/07/01263e3f813116cc9b61010b8ca580c742.png')"
                            }}></span>
                            <em>童装</em>
                            <span className="title">KIDS</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/wander">
                            <span className="nav-img" style={{
                                backgroundImage: "url('//img12.static.yhbimg.com/yhb-img01/2015/10/19/07/026df1f974add11e823d1912d920176b6c.png')"
                            }}></span>
                            <em>创意生活</em>
                            <span className="title">LIFE STYLE</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <BottomNav/>
        </section>;
    }

    rightOff = ev => {
        this.setState({
            left: "left",
            right: "right on",
            mark: "mark"
        });
    };

    leftOn = ev => {
        this.setState({
            left: this.state.left + " on",
            right:this.state.right.replace("on", "off"),
            mark: this.state.mark + " dis"
        });
    };
}

export default connect(state => ({...state.home, ...state.person}), action.home)(Home);


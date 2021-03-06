import React from "react";
import {connect} from "react-redux";
import queryCommodity from "../../api/commodity";
import Catalogue from "../../component/Catalogue";


class Body extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            flag: -1
        };
    }

    async componentDidMount() {
        let result = await queryCommodity();
        if (result.code === 0) {
            this.setState({
                data: result.data
            });
        }
    }

    render() {
        let {data} = this.state;
        if (data.length === 0) return "";
        return (
            <div>

                <div className="sortListBox">
                    <ul className="productBox" onClick={this.handleClick}>
                        <li>
                            <a href="javascript:;">默认</a>
                        </li>
                        <li>
                            <a href="javascript:;">新品</a>
                        </li>
                        <li>
                            <a href="javascript:;">人气</a>
                        </li>
                        <li>
                            <a href="javascript:;">价格</a>{" "}
                        </li>
                    </ul>
                </div>
                <div className="imgListBox">
                    {data.map((item, index) => {
                        let {pic, desc, price, name, data, moods, id, oldPrice} = item;
                        return (

                            <Catalogue
                                pic={pic}
                                desc={desc}
                                price={price}
                                name={name}
                                data={data}
                                moods={moods}
                                id={id}
                                oldPrice={oldPrice}
                                index={index}
                                key={index}
                            />

                        );
                    })}
                </div>
            </div>
        );
    }

    handleClick = ev => {
        let target = ev.target,
            tarTag = target.tagName,
            tarText = target.innerText;
        let {data, flag} = this.state;
        flag *= -1;
        if (tarTag === "A") tarTag = "LI";
        if (tarText === "默认" && tarTag === "LI") {
            data.sort((a, b) => {
                return a.id - b.id;
            });
        }
        if (tarText === "新品" && tarTag === "LI") {
            data.sort((a, b) => {
                return (new Date(a.data).getTime() - new Date(b.data).getTime()) * flag;
            });
        }
        if (tarText === "人气" && tarTag === "LI") {
            data.sort((a, b) => {
                return (a.moods - b.moods) * flag;
            });
        }
        if (tarText === "价格" && tarTag === "LI") {
            data.sort((a, b) => {
                return (a.price - b.price) * flag;
            });
        }
        this.setState({data, flag});
    };
}

export default connect()(Body);

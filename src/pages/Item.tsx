import React from 'react';
import cls from 'classnames';
interface State { }
interface Props { }
class Item extends React.Component<any, State> {

    static defaultProps = {
    };
    constructor(props: Props) {
        super(props);
    }
    render() {
        const { item, dispatch, update, index } = this.props;
        return (<div style={{ borderBottom: '1px solid #F6F6F6', }} className={cls("pt-md fbox fbox-vc", item.visited ? 'visited' : '')}>
            <a target="_blank" href={item.url} className={cls("flex1 block bg-white",)} style={{ padding: '0 15px' }} onClick={e => {
                dispatch({
                    type: 'home/doUpdate', payload: {
                        id: item.id,
                        data: {
                            visited: true,
                        }
                    }
                })
            }}>
                <div
                    className="fbox fbox-hb txc-content"

                >
                    <span className="fs15">{item.auth}</span>
                    <span className="fs14">{item.lastDate}</span>
                </div>
                <div className="fbox" style={{ padding: '15px 0' }}>
                    <div style={{}}>
                        <div className="bold mb-md fs15 txc-base" style={{ lineHeight: 1.28 }}>{index + '、' + item.title}</div>
                        <div>回应	<span className="fs14">{item.commentCount}</span></div>
                    </div>
                </div>
            </a>
            <div className="plr-lg">
                <div onClick={() => {
                    update(item.id, { like: !item.like })
                }}>

                    <svg className="icon" viewBox="0 0 1107 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                        <path fill={item.like ? "#d4237a" : '#ccc'} d="M1080.236973 219.025297a333.076757 333.076757 0 0 0-72.89773-106.080865 338.473514 338.473514 0 0 0-107.658378-71.126486 339.884973 339.884973 0 0 0-131.210379-26.015135 342.071351 342.071351 0 0 0-214.901621 75.748324 330.447568 330.447568 0 0 0-36.504216-25.766054A342.237405 342.237405 0 0 0 338.694919 15.802811a340.134054 340.134054 0 0 0-131.238054 26.015135 338.030703 338.030703 0 0 0-107.630703 71.126486A331.388541 331.388541 0 0 0 26.900757 219.025297 328.953081 328.953081 0 0 0 0 349.626811c0 42.648216 8.717838 87.123027 26.015135 132.372757 14.474378 37.804973 35.231135 76.99373 61.772108 116.597621 42.011676 62.65773 99.826162 128.027676 171.589189 194.255568 118.894703 109.817081 236.654703 185.676108 241.664 188.775784l30.360217 19.456a41.098378 41.098378 0 0 0 44.225729 0l30.360217-19.456c5.009297-3.210378 122.630919-78.958703 241.664-188.775784 71.763027-66.227892 129.577514-131.597838 171.589189-194.255568 26.540973-39.603892 47.436108-78.792649 61.772108-116.597621 17.297297-45.24973 26.015135-89.724541 26.015135-132.372757a326.019459 326.019459 0 0 0-26.790054-130.601514z"></path>
                    </svg>
                </div>
                <div className="mt-md fs14 txc-content" onClick={() => {
                    update(item.id, { bank: !item.bank })
                }}>
                    <span>屏蔽</span>
                </div>
            </div>
        </div>)
    }
}
export default Item;
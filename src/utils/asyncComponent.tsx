import React from 'react';

interface IProps {
    component: any;
}

/**
 * 异步加载模块
 * @params {*} importComponent
 */
export default function asyncComponent(importComponent: Promise<any>) {
    class AsyncComponent extends React.Component<IProps, any> {
        constructor(props: any) {
            super(props);
            this.state = {
                component: null
            }
        }


        async componentDidMount() {
            const {default: component} = await importComponent;
            this.setState({component});
        }

        render() {
            const Component = this.state.component;
            return Component ? <Component {...this.props}/> : null;
        }
    }

    return AsyncComponent;
}

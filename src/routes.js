import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
// import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/FontAwesome';

import CustomDrawer from './components/CustomDrawer';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Main from './pages/Main';

import Comments from './pages/registrations/comments';
import Groups from './pages/registrations/groups';
import PaymentForm from './pages/registrations/paymentForm';
import Products from './pages/registrations/products';
import Users from './pages/registrations/users';

import Sales from './pages/Attendance/Sales';
import Receivement from './pages/Attendance/Receivement';
import Standby from './pages/Attendance/Standby';
import ListSales from './pages/Attendance/ListSales';

const Routes = createAppContainer(
    createSwitchNavigator(
        {
            Sign: createSwitchNavigator({
                SignIn,
                SignUp
            }),
            Work: createDrawerNavigator({
                Main: {
                    screen: Main, navigationOptions: {
                        drawerLabel: 'Home',
                        drawerIcon: ({ tintColor }) => (
                            <Icon name="home" size={24} color={tintColor} />)

                    }
                },
                Comments: {
                    screen: Comments, navigationOptions: {
                        drawerLabel: 'Observações',
                        drawerIcon: ({ tintColor }) => (
                            <Icon name="comments" size={24} color={tintColor} />)

                    }
                },
                Groups: {
                    screen: Groups, navigationOptions: {
                        drawerLabel: 'Grupos de Produtos',
                        drawerIcon: ({ tintColor }) => (
                            <Icon name="bars" size={24} color={tintColor} />)

                    }
                },
                PaymentForm: {
                    screen: PaymentForm, navigationOptions: {
                        drawerLabel: 'Formas de Pagamento',
                        drawerIcon: ({ tintColor }) => (
                            <Icon name="bitcoin" size={24} color={tintColor} />)

                    }
                },
                Products: {
                    screen: Products, navigationOptions: {
                        drawerLabel: 'Cadastro de Produtos',
                        drawerIcon: ({ tintColor }) => (
                            <Icon name="coffee" size={24} color={tintColor} />)

                    }
                },
                Users: {
                    screen: Users, navigationOptions: {
                        drawerLabel: 'Cadastro de Usuários',
                        drawerIcon: ({ tintColor }) => (
                            <Icon name="user-circle" size={24} color={tintColor} />)

                    }
                },

            },
            {
                contentComponent: CustomDrawer,
                drawerBackgroundColor: '#252525',
                contentOptions: {
                    activeBackgroundColor: '#000000',
                    activeTintColor: '#b8860b',
                    inactiveBackgroundColor: '#252525',
                    inactiveTintColor: 'white'
                }
            }),
            Attendance: createSwitchNavigator({
                Sales,
                Receivement,
                Standby,
                ListSales,
            }),
        },
    ),
)

export default Routes;

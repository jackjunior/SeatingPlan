import React,{
    Component,
    StyleSheet,
    View,
    Text,
    PanResponder,
    Animated,
    Easing,
    Dimensions
} from 'react-native';


export default class Viewport extends Component{
    constructor(props){
        super(props);
	    
	    const { increment, decrement } = this.props;
	    
        this.state = {
            pan1             : new Animated.ValueXY(),
            pan2             : new Animated.ValueXY()
        };

        this.panResponder1 = PanResponder.create({
            onStartShouldSetPanResponder    : () => true,
            onPanResponderMove              : Animated.event([null,{
                dx  : this.state.pan1.x,
                dy  : this.state.pan1.y
            }]),
            onPanResponderRelease           : (e, gesture) => {
                    console.log(this.state.pan1.x._value)
                    increment();
            }
        });
        
        this.panResponder2 = PanResponder.create({
            onStartShouldSetPanResponder    : () => true,
            onPanResponderMove              : Animated.event([null,{
                dx  : this.state.pan2.x,
                dy  : this.state.pan2.y
            }]),
            onPanResponderRelease           : (e, gesture) => {
                     //this.state.pan2.flattenOffset();
                     decrement()
            }
        });
    }

    render(){
	    const { counter } = this.props;

	    
        return (
            <View style={styles.mainContainer}>
                <View 
                    style={styles.dropZone}>
                    <Text style={styles.label}>abc{counter}</Text>
                    {this.renderDraggable()}
                </View>
            </View>
        );
    }

    renderDraggable(){
            return (
	            <View>
		            <View style={styles.draggableContainer}>
		                <Animated.View 
		                    {...this.panResponder1.panHandlers}
		                    style={[this.state.pan1.getLayout(), styles.circle]}>
		                    
		                </Animated.View>
		            </View>
		            
		            <View style={styles.draggableContainer2}>
		            	<Animated.View 
		                    {...this.panResponder2.panHandlers}
		                    style={[this.state.pan2.getLayout(), styles.square]}>
		                    
		                </Animated.View>
		            </View>
                </View>
            );
    }
}

let CIRCLE_RADIUS = 20;
let SQUAREWIDTH = 30;
let Window = Dimensions.get('window');
let styles = StyleSheet.create({
    mainContainer: {
        flex    : 1
    },
    dropZone    : {
        height  : 80,
        backgroundColor:'#2c3e50'
    },
    label		: {
	  	position	: 'absolute',
	  	top         : 10,
        left        : 10,
        textAlign   : 'center',
        color       : '#fff',
        fontSize	: 12
    },
    text        : {
		fontSize	: 12,
        textAlign   : 'center',
        color       : '#fff'
    },
    draggableContainer: {
	    backgroundColor     : '#2c3e50',
        position    : 'absolute',
        top         : 10,
        left        : CIRCLE_RADIUS + 50,
    },
    draggableContainer2: {
	    backgroundColor     : '#2c3e50',
        position    : 'absolute',
        top         : 10,
        left        : CIRCLE_RADIUS + 100,
    },
    circle      : {
        backgroundColor     : '#0080FF',
        width               : CIRCLE_RADIUS*2,
        height              : CIRCLE_RADIUS*2,
        borderRadius        : CIRCLE_RADIUS
    },
    square		: {
	    backgroundColor     : '#0080FF',
	    width				: SQUAREWIDTH,
	    height				: SQUAREWIDTH
    }
});
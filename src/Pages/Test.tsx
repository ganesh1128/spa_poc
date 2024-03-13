import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { decrement, increment, setName } from '../Redux/Reducers/counterSlice';

function Test() {
    const counter = useAppSelector((state:any) => state.counter.value)
    const myName = useAppSelector((state:any) => state.counter.name);
    
    const dispatch = useAppDispatch();
    let count:number = 1;
    const handleCount = (pos:String)=>{
        if(pos=="pos"){
            dispatch(increment())
        }else{
            dispatch(decrement())
        }
    }
    const handlename =(e:string)=>{
        dispatch(setName(e))
    }
  return (
    <div>
        <button onClick={()=>{handleCount("pos")}}>+</button>
        <button onClick={()=>{handleCount("dos")}}>-</button>

      counter is {counter}
      <input type="text" name="" id="" value={myName} onChange={(e)=>{handlename(e.target.value)}}/>
    {myName}
    </div>
  )
}

export default Test;


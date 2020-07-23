import React from 'react';
import ShowArea from './showArea';
import Buttons from './bottons';
import { Color } from './color'

function useReducerDemo() {
    return (
        <div>
            <Color>
                <ShowArea />
                <Buttons />
            </Color>
        </div>
    )
}

export default useReducerDemo
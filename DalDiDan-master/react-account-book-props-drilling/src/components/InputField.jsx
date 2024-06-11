import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const StDiv = styled.div`
    display: ${(props) => props.$display};
    flex-direction: ${(props) => props.$flexDirection};
`;

function InputField(props) {
    const dateInputRef = useRef();
    const titleInputRef = useRef();
    const expenseInputRef = useRef();
    const descriptionInputRef = useRef();

    const [style, setStyle] = useState({});

    const { setInputValues, signalResetFields, setSignalResetFields } = props;

    function handleInputFieldsChange() {
        const changedInputValues = {
            date: getRefValue(dateInputRef),
            title: getRefValue(titleInputRef),
            expense: getRefValue(expenseInputRef),
            description: getRefValue(descriptionInputRef),
        };
        setInputValues(changedInputValues);
    }

    function resetInputFields() {
        const todayYYYYMMDD = new Date().toISOString().slice(0, 10);
        setRefValue(dateInputRef, todayYYYYMMDD);
        setRefValue(titleInputRef, '');
        setRefValue(expenseInputRef, '');
        setRefValue(descriptionInputRef, '');
    }

    function setInputFieldDefaultValue(defaultValues) {
        const { date, title, expense, description } = defaultValues;
        setRefValue(dateInputRef, date);
        setRefValue(titleInputRef, title);
        setRefValue(expenseInputRef, expense);
        setRefValue(descriptionInputRef, description);
    }

    function setRefValue(ref, value) {
        ref.current.value = value;
    }

    function getRefValue(ref) {
        return ref.current.value;
    }

    useEffect(
        function loadStyle() {
            if (props.style) {
                const loadedStyle = {
                    display: props.style.display,
                    flexDirection: props.style.flexDirection,
                };
                setStyle(loadedStyle);
            }
        },
        [props.style]
    );

    useEffect(
        function loadDefaultValues() {
            if (!props.defaultValues) {
                return;
            }
            if (!Object.keys(props.defaultValues).length) {
                return;
            }

            setInputFieldDefaultValue(props.defaultValues);
        },
        [props.defaultValues]
    );

    useEffect(
        function executeResetFields() {
            if (signalResetFields) {
                resetInputFields();
                setSignalResetFields(false);
            }
        },
        [signalResetFields]
    );

    return (
        <StDiv $display={style.display} $flexDirection={style.flexDirection} onChange={handleInputFieldsChange}>
            <label> 날짜 </label>
            <input type="date" ref={dateInputRef} />
            <label> 항목 </label>
            <input type="text" ref={titleInputRef} />
            <label> 금액 </label>
            <input type="number" ref={expenseInputRef} />
            <label> 내용 </label>
            <input type="text" ref={descriptionInputRef} />
        </StDiv>
    );
}
export default InputField;

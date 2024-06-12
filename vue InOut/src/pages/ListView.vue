<template>
    <div class="box">
        <h1>회원가입</h1>

        <fieldset>
            <legend>필수입력</legend>
            <table>
                <tr>
                    <td>
                        <label for="ID">아이디</label>
                    </td>
                    <td>
                        <input id="ID" type="text" placeholder="아이디를 입력하세요" required />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="password1">비밀번호</label>
                    </td>
                    <td>
                        <input id="password1" type="password" placeholder="비밀번호 입력" required />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="password2">비밀번호확인</label>
                    </td>
                    <td>
                        <input id="password2" type="password" placeholder="비밀번호 확인" required />
                    </td>
                </tr>
            </table>
        </fieldset>
        <fieldset>
            <legend class="add">추가입력</legend>
            <table class="add">
                <tr>
                    <td>
                        <label for="name">이름</label>
                    </td>
                    <td>
                        <input id="name" type="text" placeholder="이름을 입력하세요" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>성별</label>
                    </td>
                    <td>
                        <label><input type="radio" name="성별" value="male" /> 남자</label>
                        <label><input type="radio" name="성별" value="female" /> 여자</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="phone">휴대전화</label>
                    </td>
                    <td>
                        <input id="phone" type="tel" placeholder="'-'없이 입력" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="mail">이메일</label>
                    </td>
                    <td>
                        <input id="mail" type="email" placeholder="이메일주소" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="citizenNumber">주민등록번호</label>
                    </td>
                    <td>
                        <input id="citizenNumber" type="tel" placeholder="주민등록 앞자리 7자리" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="adress">주소</label>
                    </td>
                    <td>
                        <input id="adress" type="adress" placeholder="주소를 입력해주세요" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="detailAdress">상세주소</label>
                    </td>
                    <td>
                        <input id="detailAdress" type="adress" placeholder="상세주소를 입력해주세요" />
                    </td>
                </tr>
            </table>
        </fieldset>
        <fieldset class="hobby">
            <legend>알게 된 경로</legend>
            <input type="checkbox" />검색<br />
            <input type="checkbox" />지인<br />
            <input type="checkbox" />우연히<br />
            <input type="checkbox" />소개<br />
            <input type="checkbox" />회사<br />
        </fieldset>
        <div class="wrap">
            <tr class="cursor-pointer" onclick="location.href='user/editById';">
                <button class="btn-1" type="reset">다시작성</button>
            </tr>
            <tr class="cursor-pointer" onclick="location.href='user/findById';">
                <button class="btn-1" type="submit">가입하기</button>
            </tr>
        </div>
    </div>
</template>

<style></style>

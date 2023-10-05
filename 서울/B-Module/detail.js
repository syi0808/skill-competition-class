const comments = [];

async function getSoapByIndex(index) {
  const { data } = await (await fetch('./assets/soap.json')).json();

  return data.at(index);
}

function openDetailModal() {
  document.getElementById('detailModal').style.display = 'block';
}

function closeDetailModal() {
  document.getElementById('detailModal').style.display = 'none';
}

function submitComment(e, soapIndex) {
  e.preventDefault();

  comments.push({
    soapIndex,
    userId: user?.id,
    userName: user?.name,
    body: e.srcElement.comment.value,
    point: Number(e.srcElement.point.value),
  });

  renderComments(soapIndex);
}

function deleteComment(soapIndex, index) {
  comments.splice(index, 1);

  renderComments(soapIndex);
}

function renderComments(soapIndex) {
  const commentList = comments
    .map((comment, index) => ({ ...comment, index }))
    .filter((comment) => comment.soapIndex === soapIndex);

  document.getElementById('comments').innerHTML = commentList
    .map(
      (comment) => `
      <div>
        <span>작성자: ${comment.userName}</span>
        <span>내용: ${comment.body}</span>
        <span>평점: ${comment.point}</span>
        ${
          comment.userId === user.id
            ? `
            <button onclick="deleteComment(${soapIndex}, ${comment.index})">삭제하기</button>
          `
            : ''
        }
      </div>
  `
    )
    .join('');

  if (commentList.length > 0) {
    document.getElementById('averagePoint').innerHTML = (
      commentList.reduce((prev, comment) => prev + comment.point, 0) / commentList.length
    ).toFixed(1);
  } else {
    document.getElementById('averagePoint').innerHTML = 0;
  }
}

async function showDetailModalByIndex(index) {
  const data = await getSoapByIndex(index);

  document.getElementById('detailModal').innerHTML = `
    <img width="200" src="./assets/img/${data.Image}" />
    <span>이름: ${data.soapName}</span>
    <span>만든날짜: ${data.release}</span>
    <span>가격: ${data.price}</span>
    <span>만든 곳: ${data.creator}</span>
    <span>평균 평점: <span id="averagePoint">0</span></span>

    <div id="comments"></div>
    <form onsubmit="submitComment(event, ${index})">
      <textarea name="comment"></textarea>
      <input type="range" min="1" max="5" step="1" name="point" />
      <button>댓글 작성하기</button>
    </form>
    <button onclick="closeDetailModal()">닫기</button>
  `;

  renderComments(index);

  openDetailModal();
}

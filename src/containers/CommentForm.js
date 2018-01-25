import React from 'react';
import { connect } from 'react-redux';
import { postComment } from '../actions';

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    const inputs = e.target.getElementsByTagName('INPUT');
    const textarea = e.target.getElementsByTagName('TEXTAREA');
    let payload = {};
    for(let i = 0 ; i < inputs.length ; i++) {
      const input = inputs[i];
      payload[ input.name ] = isNumeric(input.value) ? parseInt(input.value, 10) :
        input.value;
    }
    payload.comment_content = textarea[0].value;
    // console.log('ONSUBMIT COMMENT', payload);
    this.props.postComment(payload);
  }
  render() {
    const { form } = this.props.comments;
    return (
      <div className="comment-respond">
        <h3 id="reply-title" className="comment-reply-title">Laisser un commentaire <small><a rel="nofollow" id="cancel-comment-reply-link" href="/2018/01/post-slug/#respond" style={{ display: 'none' }}>Annuler la réponse.</a></small></h3>
        <div className="alert">{ form.statusMessage }</div>
        <form action={ COMMENTS_POST_URL } method="post" className="comment-form" onSubmit={this.onSubmit}>
            <p className="comment-notes"><span id="email-notes">Votre adresse de messagerie ne sera pas publiée.</span> Les champs obligatoires sont indiqués avec <span className="required">*</span></p>
            <p className="comment-form-comment">
                <label htmlFor="comment_content">Commentaire</label>
                <textarea id="comment_content" name="comment_content" cols="45" rows="8" maxLength="65525" aria-required="true" required="required"></textarea>
            </p>
            {/*<input name="wpml_language_code" value="fr" type="hidden" />*/}
            <p className="comment-form-author">
                <label htmlFor="author_name">Nom <span className="required">*</span></label>
                <input id="author_name" name="author_name" size="30" maxLength="245" aria-required="true" required="required" type="text" />
            </p>
            <p className="comment-form-email">
                <label htmlFor="author_email">Adresse de messagerie <span className="required">*</span></label>
                <input id="author_email" name="author_email" size="30" maxLength="100" aria-describedby="email-notes" aria-required="true" required="required" type="text" />
            </p>
            <p className="comment-form-url">
                <label htmlFor="author_url">Site web</label>
                <input id="author_url" name="author_url" size="30" maxLength="200" type="text" />
            </p>
            <p className="form-submit">
                <input name="submit" id="submit" className="submit" value="Laisser un commentaire" type="submit" />
                <input name="post" value={this.props.postId} id="post" type="hidden" />
                <input name="parent" id="parent" value="0" type="hidden" />
            </p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: state. s
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postComment: comment => dispatch(postComment(comment))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);

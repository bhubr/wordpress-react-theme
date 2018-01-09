import React from 'react';
import { connect } from 'react-redux';
import { postComment } from './actions';

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
      payload[ input.name ] = input.value;
    }
    payload.comment = textarea[0].value;
    console.log('ONSUBMIT COMMENT', payload);
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
                <label htmlFor="comment">Commentaire</label>
                <textarea id="comment" name="comment" cols="45" rows="8" maxLength="65525" aria-required="true" required="required"></textarea>
            </p>
            <input name="wpml_language_code" value="fr" type="hidden" />
            <p className="comment-form-author">
                <label htmlFor="author">Nom <span className="required">*</span></label>
                <input id="author" name="author" size="30" maxLength="245" aria-required="true" required="required" type="text" />
            </p>
            <p className="comment-form-email">
                <label htmlFor="email">Adresse de messagerie <span className="required">*</span></label>
                <input id="email" name="email" size="30" maxLength="100" aria-describedby="email-notes" aria-required="true" required="required" type="text" />
            </p>
            <p className="comment-form-url">
                <label htmlFor="url">Site web</label>
                <input id="url" name="url" size="30" maxLength="200" type="text" />
            </p>
            <p className="form-submit">
                <input name="submit" id="submit" className="submit" value="Laisser un commentaire" type="submit" />
                <input name="comment_post_ID" value="253" id="comment_post_ID" type="hidden" />
                <input name="comment_parent" id="comment_parent" value="0" type="hidden" />
            </p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: state.comments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postComment: comment => dispatch(postComment(comment))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);

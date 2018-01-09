import React from 'react';

class CommentForm extends React.Component {

  render() {
    return (
      <div className="comment-respond">
        <h3 id="reply-title" className="comment-reply-title">Laisser un commentaire <small><a rel="nofollow" id="cancel-comment-reply-link" href="/2018/01/pour-vous-parier-il-se-revoltait-contre/#respond" style="display:none;">Annuler la réponse.</a></small></h3>
        <form action="http://wpgit.drogon.tls/wp-comments-post.php" className="comment-form">
            <p className="comment-notes"><span id="email-notes">Votre adresse de messagerie ne sera pas publiée.</span> Les champs obligatoires sont indiqués avec <span className="required">*</span></p>
            <p className="comment-form-comment">
                <label for="comment">Commentaire</label>
                <textarea id="comment" name="comment" cols="45" rows="8" maxlength="65525" aria-required="true" required="required"></textarea>
            </p>
            <input name="wpml_language_code" value="fr" type="hidden">
            <p className="comment-form-author">
                <label for="author">Nom <span className="required">*</span></label>
                <input id="author" name="author" value="Madame Bovary" size="30" maxlength="245" aria-required="true" required="required" type="text">
            </p>
            <p className="comment-form-email">
                <label for="email">Adresse de messagerie <span className="required">*</span></label>
                <input id="email" name="email" value="madame.bovary@flaubert.com" size="30" maxlength="100" aria-describedby="email-notes" aria-required="true" required="required" type="text">
            </p>
            <p className="comment-form-url">
                <label for="url">Site web</label>
                <input id="url" name="url" value="https://rudegirl.sex" size="30" maxlength="200" type="text">
            </p>
            <p className="form-submit">
                <input name="submit" id="submit" className="submit" value="Laisser un commentaire" type="submit">
                <input name="comment_post_ID" value="253" id="comment_post_ID" type="hidden">
                <input name="comment_parent" id="comment_parent" value="0" type="hidden">
            </p>
        </form>
      </div>
    );
  }
}

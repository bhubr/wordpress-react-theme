# Reago - React-based theme for WordPress

## Dev stuff

- Extract strings: `xgettext --keyword=__ --keyword=esc_html__ --keyword=esc_html_e --language=PHP -o strings.po *.php`
- Merge them into new: `msgmerge -N languages/fr_FR.po strings.po > new.po`

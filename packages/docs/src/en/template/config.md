# Persistent Config

Use the `config` sub-command to persist a template source globally so the team shares one template set.

## Usage

```bash
create-uni-app config set ./my-templates   # persist as the default template source
create-uni-app config get                  # show the current template source and config location
create-uni-app config remove               # clear and fall back to the built-in template
```

## Storage Location

Config is stored at `~/.create-uni-app/config.json` by default.

To support sandbox / restricted environments (can't write the home dir) and testing:

- Use the `CREATE_UNI_APP_CONFIG_DIR` env var to specify a config directory explicitly
- When the home dir is unwritable, it falls back to the system temp directory

## Resolution Priority

`--template-source` option > global config > built-in template.
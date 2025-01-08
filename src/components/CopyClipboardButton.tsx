import { Button, CopyButton } from "@mantine/core";

function CopyClipboardButton({ value }: { value: string }) {
  return (
    <>
      <CopyButton value={value}>
        {({ copied, copy }) => (
          <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
            {copied ? 'Copied!' : 'Copy Object'}
          </Button>
        )}
      </CopyButton>
    </>
  );
}

export default CopyClipboardButton;

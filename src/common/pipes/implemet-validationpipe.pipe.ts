import { AbstractValidationPipe } from './custom-validationpipe.pipe';

export const validationPipeCustom = (body?, query?, custom?, param?) =>
  new AbstractValidationPipe(
    {
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    },
    {
      body,
      query,
      custom,
      param,
    },
  );

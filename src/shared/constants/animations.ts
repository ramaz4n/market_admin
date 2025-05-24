export const animations = {
  accordionItem: {
    animate: 'enter',
    exit: 'exit',
    initial: 'exit',
    variants: {
      enter: {
        height: 'auto',
        opacity: 1,
        transition: {
          opacity: {
            duration: 1,
            easings: 'linear',
          },
        },
      },
      exit: {
        height: 0,
        opacity: 0,
        transition: {
          opacity: {
            duration: 0.2,
            easings: 'linear',
          },
        },
      },
    },
  },

  fade: {
    animate: 'enter',
    exit: 'exit',
    initial: 'exit',
    variants: {
      enter: {
        height: 'auto',
        opacity: 1,
        scale: 1,
      },
      exit: {
        height: 0,
        opacity: 0,
        scale: 0.9,
      },
    },
  },

  formError: {
    animate: 'enter',
    exit: 'exit',
    initial: 'exit',
    variants: {
      enter: {
        height: 'auto',
        opacity: 1,
      },
      exit: {
        height: 0,
        opacity: 0,
      },
    },
  },

  modalBody: {
    animate: 'open',
    exit: 'exit',
    initial: 'close',
    variants: {
      close: {
        opacity: 0,
        scale: 0.8,
        translateY: 25,
      },
      exit: {
        opacity: 0,
        scale: 1.05,
      },
      open: {
        opacity: 1,
        scale: 1,
        translateY: 0,
      },
    },
  },
  modalRoot: {
    animate: 'open',
    exit: 'close',
    initial: 'close',
    variants: {
      close: {
        opacity: 0,
      },
      open: {
        opacity: 1,
      },
    },
  },
  overlay: {
    animate: 'open',
    exit: 'close',
    initial: 'close',
    variants: {
      close: {
        opacity: 0,
      },
      open: {
        opacity: 1,
      },
    },
  },
};

import Index from "./../index"
import {render,screen  } from "@testing-library/react";
import {describe, it, expect, test} from 'vitest';
describe('test du backend index', () => {
    test('Afficher la page', () => {
        render(<Index />);
        console.log('one')
    });
    
});

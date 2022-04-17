import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import {
  GetNFTsInput,
  CacheNFTInput,
  NFTOutput,
  NFTsOutput,
  SearchNFTsInput,
} from './dtos/nft.dto';
import { NFTService } from './nft.service';

@Resolver()
export class NFTResolver {
  constructor(private readonly nftService: NFTService) {}

  @Mutation(() => NFTOutput)
  cacheNFT(@Args() cacheNftInput: CacheNFTInput): Promise<NFTOutput> {
    return this.nftService.cacheNFT(cacheNftInput);
  }

  @Query(() => NFTsOutput)
  searchNFTs(@Args() searchNFTsInput: SearchNFTsInput): Promise<NFTsOutput> {
    return this.nftService.searchNFTs(searchNFTsInput);
  }

  @Query(() => NFTsOutput)
  getNFTs(@Args() getNFTsInput: GetNFTsInput): Promise<NFTsOutput> {
    return this.nftService.getNFTs(getNFTsInput);
  }
}
